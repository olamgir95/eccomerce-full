import { ExpandMore } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export function HelpPage() {
  const [value, setValue] = useState("1");

  const faqData = [
    {
      question: "How to make a payment",
      answer: "You can make a payment using PayMe, through click applications.",
    },
    {
      question: "Add your share for site development",
      answer:
        "Certainly, I would like to contribute to the development of the site.",
    },
    {
      question: "How to make a payment",
      answer: "You can make a payment using PayMe, through click applications.",
    },
    {
      question:
        "To place orders on the site, and to use live chats, registration is required.",
      answer:
        "The use of explicit words during live chat is strictly prohibited.",
    },
    {
      question: "How to make a payment",
      answer: "You can make a payment using PayMe, through click applications.",
    },
    {
      question: "How to make a payment",
      answer: "You can make a payment using PayMe, through click applications.",
    },
    {
      question: "How to make a payment",
      answer: "You can make a payment using PayMe, through click applications.",
    },
    {
      question: "Add your share for site development",
      answer:
        "Certainly, I would like to contribute to the development of the site.",
    },
    {
      question: "How to make a payment",
      answer: "You can make a payment using PayMe, through click applications.",
    },
    {
      question: "How to make a payment",
      answer: "You can make a payment using PayMe, through click applications.",
    },
    {
      question: "Add your share for site development",
      answer:
        "Certainly, I would like to contribute to the development of the site.",
    },
  ];

  const rules = [
    `To place orders on the site, registration is required for using live chats.`,
    `The use of explicit words during live chat is strictly prohibited.`,
    `To place orders on the site, registration is required for using live chats.`,
    `Comply with all requirements as your activities are under the supervision of our admins.`,
  ];

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="help_page" data-aos="zoom-in">
      <Container className="help_container">
        <TabContext value={value}>
          <Box className="help_menu">
            <Box className="divider">
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Rules" value={"1"} />
                <Tab label="FAQ" value={"2"} />
                <Tab label="Message to Admin" value={"3"} />
              </TabList>
            </Box>
          </Box>
          <Stack>
            <Stack className="help_main_content">
              <TabPanel value={"1"}>
                <Stack className="rules_box">
                  {rules?.map((rule, index) => (
                    <p key={index}>{rule}</p>
                  ))}
                </Stack>
              </TabPanel>
              <TabPanel value="2">
                <Stack className="accordion_menu">
                  {faqData?.map((item, index) => (
                    <Accordion key={index}>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel-content"
                        id="panel-header"
                      >
                        <Typography>{item.question}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{item.answer}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Stack>
              </TabPanel>
              <TabPanel value="3">
                <Stack className="admin_letter_container">
                  <Box className="admin_letter_frame">
                    <span>Send Message to Admin</span>
                    <p>
                      Hello! To send a message to the admin, please fill out the
                      form below!
                    </p>
                  </Box>
                  <form action="#" method="POST" className="letter_form">
                    <div className="input_letter_box">
                      <label htmlFor="name">Name</label>
                      <input type="text" name="mb_nick" placeholder="Name" />
                    </div>
                    <div className="input_letter_box">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        name="mb_mail"
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="input_letter_box">
                      <label htmlFor="subject">Message</label>
                      <textarea name="mb_msg" placeholder="Message"></textarea>
                    </div>
                  </form>
                  <Box className="send_btn">
                    <Button variant="contained" type="submit">
                      Send
                    </Button>
                  </Box>
                </Stack>
              </TabPanel>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
