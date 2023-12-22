
// **** app initializations **** //

import "reflect-metadata";
import InitializeApp from "./server/initializeApp";
import { container, registry } from "tsyringe";

registry([
        {token: "InitializeApp", useClass: InitializeApp}, // can be any provider
])

const startApp = () => {
    console.log("-----app starting -------------");
    container.resolve<InitializeApp>(InitializeApp);
    console.log("-----app -- yajuvendra -- started -------------");
}

startApp()


