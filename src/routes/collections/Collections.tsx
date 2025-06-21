import { Link } from "react-router";

function IdeasLink({ to, name }: { to: string; name: string }) {
  return (
    <div className="row mb-3">
      <div className="col">
        <h3 className="text-uppercase">
          <Link to={to}>{name}</Link>
        </h3>
      </div>
    </div>
  );
}

export default function Collections() {
  return (
    <>
      <h1 className="mb-5">Collections</h1>
      <IdeasLink to="ideas/ideas-1" name="Ideas 1" />
      <IdeasLink to="ideas/ideas-2" name="Ideas 2" />
      <IdeasLink to="ideas/ideas-3" name="Ideas 3" />
      <IdeasLink to="ideas/ideas-4" name="Ideas 4" />
      <IdeasLink to="ideas/ideas-5" name="Ideas 5" />
      <IdeasLink to="ideas/ideas-6" name="Ideas 6" />
      <IdeasLink to="ideas/ideas-7" name="Ideas 7" />
    </>
  );
}
