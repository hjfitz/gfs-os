import { config } from "../config";
import { GithubAPI } from "./api";
import { GithubService } from "./service";

const github = new GithubAPI(config.github.token, config.github.org);
export const githubService = new GithubService(github);
