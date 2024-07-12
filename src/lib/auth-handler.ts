import {omit} from "lodash";

const action = "request-profile";

const authHandler = {
  action,
  claims: {
    profile: () => ({
      description: "Please provide your full profile",
      fields: ["fullName", "email", "phone", "signature", "avatar", "birthday"],
    }),
  },

  onAuth: ({ userDid, userPk, claims, updateSession }: any) => {
    const claim = claims.find((x: { type: string; }) => x.type === "profile");
    updateSession({
      result: {
        ...omit(claim, ["type", "signature"]),
        did: userDid,
        pk: userPk,
      },
    });
  },
};

export default authHandler;
