import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
    // .catch((err) => console.error(err));
  }

  function deleteInterview() {
    transition(DELETING);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
    // .catch((err) => console.error(err));
  }

  function editInterview() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={editInterview}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === ERROR_SAVE && (
        <Error message={"Could not save appointment"} onClose={back} />
      )}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === ERROR_DELETE && (
        <Error message={"Could not delete appointment"} onClose={back} />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete"}
          onConfirm={deleteInterview}
          onCancel={back}
        />
      )}
    </article>
  );
}
