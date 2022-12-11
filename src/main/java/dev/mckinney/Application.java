package dev.mckinney;

import dev.mckinney.models.Task;
import dev.mckinney.services.TaskService;

import java.util.ArrayList;

public class Application {

    public static void main(String[] args) {
        TaskService taskService = new TaskService();
        System.out.println(taskService.removeTask(24));
    }
}
