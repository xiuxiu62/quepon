import { Router, Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { User } from "../entity/user";
import { UserService } from "../services";

class UserController {
  private service: UserService;
  public router: Router;

  constructor(db: string) {
    this.service = new UserService(db);
    this.router = Router();
    this.routes();
  }

  private list = async (_: Request, res: Response) => {
    const result: Array<User> = await this.service.list();
    res.send(result).json();
  };

  private get = async (req: Request, res: Response) => {
    const id: number = Number(req.params["id"]);
    const result: User | undefined = await this.service.get(id);
    res.send(result).json();
  };

  private create = async (req: Request, res: Response) => {
    const user = req.body as User;
    const result: User = await this.service.create(user);
    res.send(result).json();
  };

  private update = async (req: Request, res: Response) => {
    const id: number = Number(req.params["id"]);
    const user = req.body as User;
    const result: UpdateResult = await this.service.update(id, user);
    res.send(result).json();
  };

  private delete = async (req: Request, res: Response) => {
    const id: number = Number(req.params["id"]);
    const result: DeleteResult = await this.service.delete(id);
    res.send(result).json();
  };

  public routes() {
    this.router.get("/", this.list);
    this.router.get("/", this.get);
    this.router.get("/:id", this.create);
    this.router.get("/:id", this.update);
    this.router.get("/:id", this.delete);
  }
}

export { UserController };
