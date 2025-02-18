import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { ProfilePage } from "./pages/ProfilePage";
import { SecurityPage } from "./pages/SecurityPage";
import { OrdersPage } from "./pages/OrdersPage";
import { PageState } from "@/interfaces/general.interface";
import { ProfileOrder } from "@/interfaces/order.interface";
import { ProfileSidebar } from "./ui/ProfileSidebar";
import { UserProfile } from "@/interfaces/user.interface";
import { useSession } from "next-auth/react";
import { getUserData } from "@/actions/user/getUserData";
import { Spinner } from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";

interface Props {
  onSettingClick: () => void;
  page?: PageState;
}

export const ProfileModal = ({ onSettingClick, page = "profile" }: Props) => {
  const { data: session } = useSession();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadedPages, setLoadedPages] = useState({
    profile: false,
    security: false,
    orders: false,
  });
  const [showSidebar, setShowSidebar] = useState(false);
  const [renderPage, setRenderPage] = useState<PageState>(page);
  const [orders, setOrders] = useState<ProfileOrder[]>([]);
  const [userData, setUserData] = useState<UserProfile | null>(null);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const changePage = (newPage: PageState) => {
    setShowSidebar(false);
    setRenderPage(newPage);
  };

  useEffect(() => {
    setLoadedPages((prevLoadedPages) => ({
      ...prevLoadedPages,
      [renderPage]: true,
    }));
  }, [renderPage]);

  const loadUserData = useCallback(async () => {
    setIsLoading(true);
    if (session?.user.id) {
      try {
        const res = await getUserData();
        setUserData(res.user);
      } catch {
        router.replace("/auth/sign-in");
      }
    }
    setIsLoading(false);
  }, [session?.user.id, setUserData, router]);

  useEffect(() => {
    if (!userData) {
      loadUserData();
    }
  }, [userData, loadUserData]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
        }}
        className="bg-black/30 inset-0 z-30 cursor-pointer fixed"
        onClick={onSettingClick}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, y: "-45%", x: "-50%" }}
        animate={{ opacity: 1, y: "-50%" }}
        transition={{
          duration: 0.3,
        }}
        className="px-4 flex justify-center items-center z-40 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-6xl w-full fixed"
      >
        <div className="flex max-w-6xl bg-white shadow w-full rounded-xl overflow-hidden h-[60vh]">
          {/* Sidebar */}
          <ProfileSidebar
            changePage={changePage}
            showSidebar={showSidebar}
            renderPage={renderPage}
          />

          {/* Profiles Pages */}
          {isLoading ? (
            <Spinner
              className="absolute top-1/2 left-1/2 animate-pulse -translate-x-1/2 -translate-y-1/2"
              bounceColor="bg-indigo-600"
            />
          ) : (
            <>
              {renderPage === "profile" && (
                <ProfilePage
                  userData={userData}
                  setUserData={setUserData}
                  toggleSidebar={toggleSidebar}
                />
              )}
              {renderPage === "security" && (
                <SecurityPage
                  toggleSidebar={toggleSidebar}
                  hasPassword={userData?.hasPassword ?? false}
                  setUserData={setUserData}
                />
              )}
              {renderPage === "orders" && (
                <OrdersPage
                  toggleSidebar={toggleSidebar}
                  isLoaded={loadedPages["orders"]}
                  orders={orders}
                  setOrders={setOrders}
                />
              )}
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};
