import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, } from "react";
import { callAPI } from "../callAPI";

export default function CreateUserForm() {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const createUser = async () => {
    setLoading(true);
    try {
      
    } catch (e) {
      console.log(e)
    }
    setLoading(false);
  }

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            {isLoading && <p>Creating new user...</p>}
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Create User
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type="text"  />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="age" isRequired>
                <FormLabel>Age</FormLabel>
                <InputGroup>
                  <Input type="number"  />
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={() => { createUser() }}
                >
                  Create
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
