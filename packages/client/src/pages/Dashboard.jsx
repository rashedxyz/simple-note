import useAuth from "../hooks/useAuth";

function Dashboard() {
  const { auth } = useAuth();
  console.log(auth);
  return <div>dashboard</div>;
}

export default Dashboard;
