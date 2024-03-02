import express, { Router } from "express";
import path from "path";

import cors from "cors";

interface Options {
  port: number;
  public_path?: string;
  routes: Router;
}

export class Server {
  public readonly app = express();

  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;
  private serverListener?: any;

  constructor(options: Options) {
    const { port, public_path = "public", routes } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }
  async start() {
    //* Middlewares
    this.app.use(cors());
    this.app.use(express.json()); //raw
    this.app.use(express.urlencoded({ extended: true })); //x-www-...

    //* Public folder
    this.app.use(express.static(this.publicPath));

    //* Routs
    this.app.use(this.routes);

    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on Port: ${this.port}`);
    });
  }
  public close() {
    this.serverListener?.close();
  }
}
