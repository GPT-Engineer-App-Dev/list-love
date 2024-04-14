// Complete the Index page component for a basic Todo application
import { useState } from "react";
import { Box, Input, Button, List, ListItem, IconButton, Text, Checkbox, Flex, Heading } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: input,
        isCompleted: false,
        images: [],
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleImageUpload = (event, taskId) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result;
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, images: [...task.images, imageUrl] } : task)));
    };
    reader.readAsDataURL(file);
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Todo List</Heading>
      <Flex mb={4}>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a new task" mr={2} />
        <Button onClick={handleAddTask} leftIcon={<FaPlus />} colorScheme="blue">
          Add
        </Button>
      </Flex>
      <List spacing={3}>
        {tasks.map((task) => (
          <ListItem key={task.id} p={2} borderWidth="1px" borderRadius="lg" display="flex" alignItems="center" justifyContent="space-between">
            <Checkbox isChecked={task.isCompleted} onChange={() => handleToggleComplete(task.id)} mr={2}>
              <Text as={task.isCompleted ? "del" : undefined}>{task.text}</Text>
            </Checkbox>
            <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} colorScheme="red" aria-label="Delete task" />
            <Input type="file" onChange={(e) => handleImageUpload(e, task.id)} placeholder="Upload Image" size="sm" />
            <Flex wrap="wrap">
              {task.images.map((image, index) => (
                <Box key={index} p={1} borderWidth="1px" borderRadius="lg">
                  <Image src={image} boxSize="100px" objectFit="cover" />
                </Box>
              ))}
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
