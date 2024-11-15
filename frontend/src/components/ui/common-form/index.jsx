import { Button } from "../button";

function CommonForm({ handleSubmit, buttonTex }) {
  return (
    <form onSubmit={handleSubmit}>
      {/* Render form controls here */}
      <Button type="submit">{buttonTex || "Submit"}</Button>
    </form>
  );
}

export default CommonForm;
