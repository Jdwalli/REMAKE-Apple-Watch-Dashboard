import { Header } from '../components/navigation/header/Header';
import { Sidebar} from '../components/navigation/sidebar/Sidebar';
import React, { FunctionComponent } from "react";

const style = {
  container: `bg-gray-900 h-screen overflow-hidden relative`,
  mainContainer: `flex flex-col h-screen pl-0 w-full lg:pl-20 lg:space-y-4`,
  main: `h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:pt-4 lg:pt-0 lg:px-4`,
};

interface DashboardProps{
  children: any;
}

const Layout: FunctionComponent<DashboardProps>= (props: DashboardProps) => {
    return (
        <div className={style.container}>
          <div className="flex items-start">
            <Sidebar />
            <div className={style.mainContainer}>
              <Header />
              <main className={style.main}>{props.children}</main>
            </div>
          </div>
        </div>
    );
}

export default Layout
