import { Owner } from '../../branches/models/owner.model';

export interface Commit {
  sha: string;
  node_id: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: Date | string;
    };
    committer: {
      name: string;
      email: string;
      date: Date | string;
    };
    message: string;
    tree: {
      sha: string;
      url: string;
    };
    url: string;
    comment_count: number;
    verification: {
      verified: boolean;
      reason: string;
      signature: string | null;
      payload: null;
    };
  };
  url: string;
  html_url: string;
  comments_url: string;
  author: Owner;
  committer: Owner;
  parents: {
    sha: string;
    url: string;
    html_url: string;
  }[];
}
