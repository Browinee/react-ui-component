import InternalForm from "./Form";
import Item from "./Item";

type InternalFormType = typeof InternalForm;

export interface FormInterface extends InternalFormType {
  Item: typeof Item;
}

const Form = InternalForm as FormInterface;

Form.Item = Item;

export default Form;
