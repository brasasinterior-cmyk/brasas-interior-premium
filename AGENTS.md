<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Menu products and gallery photos live in Lovable Cloud tables (products, gallery_photos), edited from the hidden /admin page; admin = user_roles 'admin' (first signup auto-promoted). Why: owner edits content without code. Images go to the private site-images bucket via long-lived signed URLs because public buckets are blocked.
