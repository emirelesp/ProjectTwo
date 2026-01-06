import config from "devextreme/core/config";
//import { useEffect } from "react";

const Licencia = () => {
 
    if (typeof window !== "undefined") {
        config({
            licenseKey:
                "ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogIjkxMjM3ODIyLWE0NGItNDAwNy04ZWZkLTFlZDJkNjVmMGYzZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjQyCn0=.iiWm/PXpC5ia57+iONdW6pD8vtMcG+EUhtTgAAO/r4qTm73K8PCkQDb3sn08/QMyKM2z9av6W1fMFZ5EI6W47Vd2CDE0+2E1FFtlJuQ15ItxF86mwzzZspxfH9VwwWaDGJA0Ew==",
        });
    }
    return null;
};

export default Licencia;
