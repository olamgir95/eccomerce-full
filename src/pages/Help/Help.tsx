import { ExpandMore } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import faqData from "../../constants/faqData";
import ruleData from "../../constants/ruleData";

export function HelpPage() {
  const [value, setValue] = useState("1");

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div data-aos="zoom-in">
      <Container className="help_page">
        <TabContext value={value}>
          <Box className="help_menu">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "100px",
                fontWeight: 600,
              }}
            >
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
              <TabPanel value={"1"} sx={{ height: 590 }}>
                <Stack className="accordion_menu">
                  {ruleData?.map((item, index) => (
                    <Accordion key={index}>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel-content"
                        id="panel-header"
                      >
                        <Typography>{item.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{item.description}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Stack>
              </TabPanel>
              <TabPanel value="2" sx={{ height: 590 }}>
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
              <TabPanel value="3" sx={{ height: 590 }}>
                <div className="w-full max-w-2xl mx-auto p-10 bg-white border border-gray-300 rounded-lg shadow-md">
                  <div className="mb-4">
                    <span className="text-black text-2xl font-normal">
                      Send Message to Admin
                    </span>
                    <p className="text-gray-600 mt-1">
                      Hello! To send a message to the admin, please fill out the
                      form below!
                    </p>
                  </div>

                  <form action="" method="POST" className="space-y-3">
                    <div className="flex flex-col">
                      <label
                        htmlFor="name"
                        className="text-purple-800 font-bold"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="mb_nick"
                        placeholder="Name"
                        className="mt-2 px-4 py-2 border border-purple-800 rounded-lg"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="email"
                        className="text-purple-800 font-bold"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="mb_mail"
                        placeholder="Email Address"
                        className="mt-2 px-4 py-2 border border-purple-800 rounded-lg"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="subject"
                        className="text-purple-800 font-bold"
                      >
                        Message
                      </label>
                      <textarea
                        name="mb_msg"
                        placeholder="Message"
                        className="mt-2 px-4 py-2 border border-purple-800 rounded-lg"
                      ></textarea>
                    </div>

                    <div className="text-right">
                      <button
                        type="submit"
                        className="px-6 py-1 bg-purple text-white rounded-lg hover:bg-vividPink uppercase"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </TabPanel>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
