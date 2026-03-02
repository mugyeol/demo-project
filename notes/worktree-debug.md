# Worktree Debug Note

- **Date:** March 2, 2026
- **Context:** Trace how issue-specific pickups map to local git worktrees for `trustmee-test` without touching the frontend code.

## Current Worktrees

```
/Users/mugyeol/git-repos/trustmee-test                       3b7376e [main]
/Users/mugyeol/git-repos/trustmee-test/.worktrees/issue/1    3b7376e [issue/1]
/Users/mugyeol/git-repos/trustmee-test/.worktrees/issue/3    3b7376e [issue/3]
/Users/mugyeol/git-repos/trustmee-test/.worktrees/issue/3-2  3b7376e [issue/3-2]
/Users/mugyeol/git-repos/trustmee-test/.worktrees/issue/5    3b7376e [issue/5]
```

## Verification Steps

1. Run `git fetch origin --prune` to keep refs in sync before picking a new issue.
2. Use `git worktree list` to confirm the target issue already has a dedicated path (see above).
3. If a worktree is missing, create it with `git worktree add .worktrees/issue/<id> origin/main` and switch branches as needed.
4. Inside `.worktrees/issue/5`, run `git status -sb` to ensure the worktree is clean before starting implementation.

## Notes

- `issue/5` is mapped to `/Users/mugyeol/git-repos/trustmee-test/.worktrees/issue/5`, which is the current working directory.
- Keeping these notes in `notes/worktree-debug.md` avoids any unintended frontend diffs.
