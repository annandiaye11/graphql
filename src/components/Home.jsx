import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import "../style/App.css";
import { useAuth } from "../utils/AuthProvider";
import { AuditGraph } from "./auditGraph";
import { Best_skils } from "./best_skills";
import { Component } from "./ProjectChart";
import DataComponent from "./ui/fetchdata";
import RankBoardInfo from "./ui/rankBoardInfo";
import UserBoardInfo from "./ui/userBoardInfo";
import XpBoardInfo from "./ui/xpBoardInfo";

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-start items-center w-full gap-12 py-12 md:px-20 lg:px-40 xl:px-56 h-screen bg-[#021526]">
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
        <div className="flex flex-col justify-start items-start gap-2">
          <p className="text-2xl text-white md:text-3xl lg:text-4xl font-normal">Hello</p>
          <DataComponent />
        </div>
        <Button
          onClick={handleSignOut}
          variant="destructive"
          className="mt-4 md:mt-0"
        >
          Log out
        </Button>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 w-full">
        <UserBoardInfo />
        <XpBoardInfo />
        <RankBoardInfo />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 w-full">
        <Component />
        <Tabs defaultValue="Audit" className=" md:w-[380px] h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Audit">Audit Chart</TabsTrigger>
            <TabsTrigger value="Skill">Skill Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="Audit">
            <AuditGraph />
          </TabsContent>
          <TabsContent value="Skill">
            <Best_skils />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
// anna
export default Home;
