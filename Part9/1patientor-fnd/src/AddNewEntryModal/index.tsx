import { Dialog, DialogContent, DialogTitle, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { onSubmitType } from "../types";
import AddNewEntry from "./AddNewEntry";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: onSubmitType) => void;
  error?: string;
}

const AddNewEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddNewEntry onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddNewEntryModal;
