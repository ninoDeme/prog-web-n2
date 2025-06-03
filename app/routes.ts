import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("novo-usuario", "routes/novo-usuario.tsx"),
] satisfies RouteConfig;
