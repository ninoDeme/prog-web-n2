import { useUsuarios } from "~/services/usuario";
import type { Route } from "./+types/home";
import { Container, Table } from "@mui/material";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "N2 Usuários!" },
    { name: "description", content: "Trabalho N2 Prog Web" },
  ];
}

export default function Home() {
  let { usuarios } = useUsuarios();
  return <Container>
    <Table></Table>
  </Container>;
}
