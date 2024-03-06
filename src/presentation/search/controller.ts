import { Request, Response } from "express";
import { HandleErrorService } from "../services/handle-error.service";
import { SearchService } from "../services/search.service";

export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly handleErrorService: HandleErrorService
  ) {}

  search = async (req: Request, res: Response) => {
    const search = req.params.search;

    this.searchService
      .search(search)
      .then((users) => res.json(users))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };
}
