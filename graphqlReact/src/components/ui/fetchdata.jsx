// src/components/ui/chart.js
import { useAuth } from "@/utils/AuthProvider";
import { useEffect, useState } from "react";

const fetchData = async (token) => {
  const response = await fetch(
    "https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        query: `
        query {
          user {
            login
            firstName
            lastName
            auditRatio
            totalUp
            totalDown
            events(where: { eventId: { _eq: 56 } }) {
              level
            }
          }
          xp_view(
            where: {
              path: { _like: "%/dakar/div-01%" }
              _and: [
                { path: { _nlike: "%checkpoint%" } }
                { path: { _nlike: "%piscine-js%" } }
                { path: { _nlike: "%piscine-rust%" } }
              ]
            }
            order_by: { amount: desc }
          ) {
            amount
            originEventId
            path
            userId
          }
       
          transaction_audits: transaction(
            order_by: { createdAt: asc }
            where: { type: { _regex: "up|down" } }
          ) {
            type
            amount
            path
            createdAt
          }
          transaction_skills: transaction(
            where: { eventId: { _eq: 56 }, 
                     _or: [
                       { type: { _like: "skill_go" } },
                       { type: { _like: "skill_prog" } },
                       { type: { _like: "skill_js" } },
                       { type: { _like: "skill_back_end" } }
                       { type: { _like: "skill_html" } },
                       { type: { _like: "skill_front_end" } },
                     ]
            }
            order_by: [{ type: asc }, { amount: desc }]
            distinct_on: type
          ) {
            type
            amount
            path
          }
      
          transaction_aggregate(where:{type:{_eq:"xp"}, event:{path:{_eq: "/dakar/div-01"}}}){
            aggregate{
            sum{
                amount
              }
            }
          }
        }
      `,
      }),
    }
  );
  const data = await response.json();
  return data.data;
};

const DataComponent = () => {
  const { token, datas, setData, setErrorFetchData, errorFetchData } =
    useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);
  useEffect(() => {
    fetchData(token)
      .then((data) => {
        if (
          data == undefined ||
          data.transaction_aggregate.aggregate.sum.amount === null
        ) {
          setErrorFetchData(true);
          setLoading(false);
          return;
        }
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (errorFetchData) return <h1>No Data</h1>;

  return (
    <div>
      {datas.user.map((user) => (
        <p className="text-4xl text-white font-semibold" key={user.firstName}>
          {user.firstName} {user.lastName}
        </p>
      ))}
    </div>
  );
};

export default DataComponent;
