import React, { useEffect, useState } from "react";

interface Dashboard {
  uid: string;
  url: string;
  title: string;
}

interface Props {
  awsUrl: string;
}

//http://a9921cff905094aa0a45e6e330684283-98913978.us-east-2.elb.amazonaws.com/api/search?folderIds=0
//`${grafanaUrl}/api/search?query=&type=dash-db`
//api/search?type=dash-folder

const GrafanaIFrames: React.FC<Props> = ({ awsUrl }) => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [iframes, setIframes] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const url = `${awsUrl}/api/search?folderIds=0`
    console.log(awsUrl)
    const fetchDashboards = async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: 'Bearer eyJrIjoiamN4UGRKVHg3cUQyZ201N042NW41bHg5bGhJaVFlaFciLCJuIjoidGVzdEtleSIsImlkIjoxfQ=='
        },
      });
      console.log(url)
      console.log(response)
      const data = await response.json();
      console.log(data)
      console.log(awsUrl)
      const tempDashboards = data.map((dashboard: any) => ({
        uid: dashboard.uid,
        url: dashboard.url,
        title: dashboard.title,
      }));
      setDashboards(tempDashboards);
    };
    fetchDashboards();
  }, [awsUrl]);

  useEffect(() => {
    const iframesArr: JSX.Element[] = [];
    for (const dashboard of dashboards) {
      const iframe = (
        <iframe
          key={dashboard.uid}
          src={`${awsUrl}${dashboard.url}`}
          title={dashboard.title}
          width="100%"
          height="600"
          style={{ border: "none" }}
        />
      );
      iframesArr.push(iframe);
    }
    setIframes(iframesArr);
  }, [dashboards, awsUrl]);
  return <div>
    {iframes}
    <div>${awsUrl}</div>
    
    </div>;
};

export default GrafanaIFrames;