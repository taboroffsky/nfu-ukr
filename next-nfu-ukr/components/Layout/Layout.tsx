import React from "react";

import LayoutStyle from "./Layout.module.scss";

const Layout = ({children} : React.PropsWithChildren<{}>): JSX.Element => {
    return (
        <div className={LayoutStyle.container}>
            <main className={LayoutStyle.main}>
                {children}
            </main>
        </div>
    )
}

export default Layout;
