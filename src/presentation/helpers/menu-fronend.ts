export const getMenuFrontEnd = (role: "USER_ROLE" | "ADMIN_ROLE") => {
  const menu = [
    {
      titulo: "DashBoard",
      icono: "mdi mdi-gauge",
      submenu: [
        { titulo: "Principal", url: "/" },
        { titulo: "Progresbar", url: "progress" },
        { titulo: "Graficas", url: "grafica1" },
        { titulo: "Promesas", url: "promise" },
        { titulo: "Rxjs", url: "rxjs" },
      ],
    },
    {
      titulo: "Mantenimiento",
      icono: "mdi mdi-folder-lock-open",
      submenu: [
        // { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: "Hospitales", url: "hospitales" },
        { titulo: "Medicos", url: "medicos" },
      ],
    },
  ];

  if (role === "ADMIN_ROLE") {
    menu[1].submenu.unshift({ titulo: "Usuarios", url: "usuarios" });
  }

  return menu;
};
