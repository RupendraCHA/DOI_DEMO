import React from 'react'

const PowerBIDashboard = () => {

    const doiDashboards = [
        {
            headerText: "Sales Order Data",
            dataText: "order",
            url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/12256cd6-0191-4734-b9e2-26fb5da6f018/519f2f1b088001690a92?experience=power-bi&clientSideAuth=0",
        },

        {
            headerText: "Delivery Header Data",
            dataText: "delivery",
            url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/a55c32db-32a9-42d9-8a3b-b4acb5d156c3/aa6705bbc3b7ef0d4147?experience=power-bi&clientSideAuth=0",
        },

        {
            headerText: "Sales Billing Data",
            dataText: "billing",
            url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/39b627f4-0188-4651-890f-d03aa68c9ab3/ce8017ebff5ddce17665?experience=power-bi&clientSideAuth=0",
        },

        {
            headerText: "Purchase Header Data",
            dataText: "purchase",
            url: "https://app.powerbi.com/groups/84691a96-fa30-4e99-8ebf-da73b935661b/reports/0c34af53-228f-49e3-a217-c7942da55d86/9399d3c37b14e9f48649?experience=power-bi&clientSideAuth=0",
        }
    ]

    // const hanelyticsDashboards = [
    //     {
    //         headerText: "Inventory predictions",
    //         dataText: "inventory",
    //         url: "https://app.powerbi.com/groups/me/reports/629c6dc2-6b0d-4c68-9e54-c2a47600a03b/df6b1d7bb0643125b744?experience=power-bi&clientSideAuth=0",
    //     },
    //     {
    //         headerText: "Revenue, Clinical and Equipment Failure",
    //         dataText: "revenue",
    //         url: "https://app.powerbi.com/groups/me/reports/31dc0bfe-4eec-4dbd-b418-c7e969f7d2f4/3610dece708b751eba90?experience=power-bi&clientSideAuth=0",
    //     }
    // ]

    return (
        // <MsalProvider instance={msalInstance}>
        <div className="bg-blue-200 min-h-screen  py-5">
            <div>
                <h1 className="text-3xl font-bold mb-[50px] text-center pt-4">View Dashboards</h1>
                {/* <PowerBIAuth onTokenReceived={setToken} /> */}
                {/* {token && <PowerBIReport token={token} />} */}
                <div className="flex items-start justify-center flex-col gap-3 flex-wrap mx-7 my-7 px-4">
                    <h1 className="text-2xl font-bold underline">DOI Dashboards</h1>
                    <div className="flex items-center flex-row justify-center gap-5 flex-wrap">
                        {doiDashboards.map((type) => {
                            return (
                                <div key={type.dataText} className="bg-white p-5 h-[60vh] w-[20vw] flex items-center flex-col justify-center gap-2 rounded-2xl shadow-lg shadow-blue-500">
                                    <h1 style={{ fontSize: "24px" }} className="font-bold  text-center">{type.headerText}</h1>
                                    <button style={{ borderRadius: "12px" }} onClick={() => login(`${type.dataText}`, `${type.url}`)} className="p-2 bg-[#2c67b0] text-[#fff] font-bold text-xl shadow-lg">
                                        <a style={{ textDecoration: "none", color: "#fff", borderRadius: "12px" }} href={type.url} target='_blank'>Click to View</a>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* <div className="flex items-start justify-center flex-col gap-3 flex-wrap mx-7">
                    <h1 className="text-2xl font-bold underline">HANElytics Dashboards</h1>
                    <div className="flex items-center flex-row justify-center gap-5 flex-wrap">
                        {hanelyticsDashboards.map((type) => {
                            return (
                                <div key={type.dataText} className="bg-white p-5 h-[60vh] w-[20vw] flex items-center flex-col justify-center gap-2 rounded-2xl shadow-lg shadow-blue-500">
                                    <h1 className="font-bold text-2xl text-center">{type.headerText}</h1>
                                    <button onClick={() => login(`${type.dataText}`, `${type.url}`)} className="p-2 bg-[#716fdeb4] rounded-xl text-[#0a0943] font-bold text-xl">
                                        <a href={type.url}>Click to View</a>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div> */}
            </div>
        </div>
        // </MsalProvider>
    );
}

export default PowerBIDashboard