import { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { Button, Slider } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

async function uploadAvatar(file: Blob) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload avatar");
  }

  return response.json();
}

type AvatarUploadProps = {
  onUploadComplete?: (path: string) => void;
};

export default function AvatarUpload({ onUploadComplete }: AvatarUploadProps) {
  const [image, setImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef<AvatarEditor>(null);

  const uploadMutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (data: { path: string }) => {
      onUploadComplete && onUploadComplete(data.path);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          uploadMutation.mutate(blob);
        }
      });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {image && (
        <>
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={250}
            height={250}
            border={50}
            scale={scale}
          />
          <Slider
            value={scale}
            min={1}
            max={2}
            step={0.01}
            onChange={(_, newValue) => setScale(newValue as number)}
          />
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? "Uploading..." : "Save Avatar"}
          </Button>
        </>
      )}
      {uploadMutation.isError && (
        <div className="text-red-500 mt-2">
          Failed to upload avatar. Please try again.
        </div>
      )}
    </div>
  );
}
