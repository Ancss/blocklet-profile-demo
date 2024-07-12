import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/lib/api";
import { setProfile, setError } from "@/store/profileSlice";
import { Profile } from "../types";
import { useEffect } from "react";

export const useProfile = () => {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const profileState = useSelector((state: any) => state.profile);

  const { isLoading, error, data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !profileState.data,
  });
  useEffect(() => {
    if (error) {
      dispatch(setError(error?.message));
      return;
    }
    if (data) {
      dispatch(setProfile(data));
    }
  }, [data, dispatch, error]);

  // 提供一个方法来手动刷新数据
  const refreshProfile = () => {
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  };
  return {
    profile: profileState.data,
    isLoading,
    error: profileState.error,
    refreshProfile,
  };
};
