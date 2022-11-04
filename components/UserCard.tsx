import {
  Heading,
  Avatar,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Center,
  Text,
  Stack,
  Button,
  Link,
  useDisclosure,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { Users } from "../types";
import { callAPI } from "../callAPI";
import { useState, useEffect, useRef, MouseEvent } from "react";

export default function UserCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [users, setUsers] = useState([] as Users[]);
  const [name, setName] = useState('');
  const [id, setId] = useState<any | null>(null);
  const [age, setAge] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const handleEdit = (id: any) => {
    return (event: React.MouseEvent) => {
      onOpen();
      setId(id);
      updateUser(id);
      event.preventDefault();
    };
  };

  const handleDelete = (id: any) => {
    return (event: React.MouseEvent) => {
      setId(id);
      deleteUser(id);
      event.preventDefault();
    };
  };

  const getUsers = async () => {
    try {
      const response = await callAPI(
        "https://8000-bravo1b9-nestnexttestba-629wb159h0i.ws-eu73.gitpod.io/users",
        "GET"
      );
      const usersJson = await response.json();
      if (usersJson && usersJson.status == true) {
        console.log(usersJson);
        setUsers(usersJson.data);
        console.log(users);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateUser = async (id: any) => {
    console.log(id);
    setLoading(true);
    try {
      const response = await callAPI(
        `https://8000-bravo1b9-nestnexttestba-629wb159h0i.ws-eu73.gitpod.io/users/${id}`,
        "PUT",
        { name, age }
      );
      const resJson = await response.json()
      if (resJson.status == true) {
        location.reload();
      } else {
        alert('There were some errors, try again...');
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const deleteUser = async (id: any) => {
    console.log(id);
    try {
      const response = await callAPI(
        `https://8000-bravo1b9-nestnexttestba-629wb159h0i.ws-eu73.gitpod.io/users/${id}`,
        "DELETE"
      );
      const resJson = await response.json()
      if (resJson.status == true) {
        location.reload();
      } else {
        alert('There were some errors, try again...');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          {isLoading && <p>Updating user...</p>}
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={initialRef} placeholder="type name here" onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Age</FormLabel>
              <Input placeholder="type age here" onChange={(e) => setAge(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => { updateUser(id) }}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {users.map((user, i) => (
        <Center key={i} py={6}>
          <Box
            maxW={"320px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
          >
            <Avatar
              size={"xl"}
              src={
                "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              }
              mb={4}
              pos={"relative"}
              _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: "green.300",
                border: "2px solid white",
                rounded: "full",
                pos: "absolute",
                bottom: 0,
                right: 3,
              }}
            />
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {user.name}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
              {user.age}
            </Text>
            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
            >
              Actress, musician, songwriter and artist. PM for work inquires or{" "}
              <Link href={"#"} color={"blue.400"}>
                #tag
              </Link>{" "}
              me in your posts
            </Text>

            <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #id{user.id}
              </Badge>
            </Stack>

            <Stack mt={8} direction={"row"} spacing={4}>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                _focus={{
                  bg: "gray.200",
                }}
                onClick={handleEdit(user.id)}
              >
                Edit
              </Button>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
                onClick={handleDelete(user.id)}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Center>
      ))}
    </>
  );
}
