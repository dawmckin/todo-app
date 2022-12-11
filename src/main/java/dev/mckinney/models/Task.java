package dev.mckinney.models;

import java.time.LocalDate;
import java.util.Objects;

public class Task {

    private int id;
    private String taskName;
    private boolean isCompleted;
    private String description;
    private LocalDate dueDate;

    public Task() {
        super();
    }

    public Task(String taskName) {
        super();
        this.taskName = taskName;
    }

    public Task(String taskName, boolean isCompleted) {
        super();
        this.taskName = taskName;
        this.isCompleted = isCompleted;
    }

    public Task(String taskName, boolean isCompleted, String description, LocalDate dueDate) {
        this.taskName = taskName;
        this.isCompleted = isCompleted;
        this.description = description;
        this.dueDate = dueDate;
    }

    public Task(int id, String taskName, boolean isCompleted, String description, LocalDate dueDate) {
        this.id = id;
        this.taskName = taskName;
        this.isCompleted = isCompleted;
        this.description = description;
        this.dueDate = dueDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public boolean getIsCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return id == task.id && isCompleted == task.isCompleted && taskName.equals(task.taskName) && description.equals(task.description) && dueDate.equals(task.dueDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, taskName, isCompleted, description, dueDate);
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", taskName='" + taskName + '\'' +
                ", isCompleted=" + isCompleted +
                ", description='" + description + '\'' +
                ", dueDate=" + dueDate +
                '}';
    }
}
