import { Request, Response } from "express";
import { PaginationDto } from "../../domain";
import { HandleErrorService } from "../services/handle-error.service";
import { SearchService } from "../services/search.service";

export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly handleErrorService: HandleErrorService
  ) {}

  search = async (req: Request, res: Response) => {
    const { page = 1, limit = 5 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });

    this.searchService
      .search(paginationDto!)
      .then((users) => res.json(users))
      .catch((error) => this.handleErrorService.handleError(error, res));
  };
}
