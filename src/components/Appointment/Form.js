import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import { useState } from "react";

export default function Form(props) {
  const { student, interviewer, interviewers, onSave, onCancel } = props;
  const [currentStudent, setCurrentStudent] = useState(student || "");
  const [currentInterviewer, setCurrentInterviewer] = useState(
    interviewer || null
  );
  const [error, setError] = useState("");

  const clear = function () {
    setCurrentStudent("");
    setCurrentInterviewer(null);
    onCancel();
  };

  function validate() {
    if (currentStudent === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (currentInterviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    onSave(currentStudent, currentInterviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={currentStudent}
            onChange={(event) => setCurrentStudent(event.target.value)}
            data-testid="student-name-input"
            /*
          This must be a controlled component
          your code goes here
        */
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          value={currentInterviewer}
          setInterviewer={setCurrentInterviewer}
          /* your code goes here */
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={clear}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
