import Nav from "../components/Nav";
import UserCard from "../components/UserCard";
import CreateUserForm from "../components/CreateUserForm";

export default function Home() {
  return (
    <>
      <Nav />
      <CreateUserForm />
      <UserCard />
    </>
  )
}