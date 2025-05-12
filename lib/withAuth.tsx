import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
// use to protect routes. (HOC) thingy
const withAuth = (WrappedComponent: React.ComponentType) => {
  return function AuthWrapper(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        router.replace("/features/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
