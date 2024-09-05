import React from "react";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const ContactSection = () => {
  const [openWhatsappDialog, setOpenWhatsappDialog] = React.useState(false);

  const handleOpenWhatsappDialog = () => setOpenWhatsappDialog(true);
  const handleCloseWhatsappDialog = () => setOpenWhatsappDialog(false);

  // Define the phone number and message
  const phoneNumber = "9779841393054"; // E.164 format, no spaces or dashes
  const message = "Hello, I would like to inquire about your services."; // Default message
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-2xl font-bold font-subheading text-center mb-8">
            Get in Touch with Us
          </h2>

          {/* Facebook link */}
          <div className="flex items-center justify-center mb-4">
            <a
              href="https://www.facebook.com/profile.php?id=61555884898391"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              <FaFacebook size={22} className="mr-2 font-subheading text-lg  " />
              <span className="hidden md:inline font-subheading text-lg ">Contact us on Facebook</span>
            </a>
          </div>

          {/* WhatsApp link */}
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={handleOpenWhatsappDialog}
              className="flex items-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              <IoLogoWhatsapp size={24} className="mr-2" />
              <span className="hidden md:inline font-subheading text-lg ">Message on WhatsApp</span>
            </button>
            <Dialog
              open={openWhatsappDialog}
              handler={handleCloseWhatsappDialog}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
            >
              <DialogHeader className="text-2xl text-center">Message on WhatsApp</DialogHeader>
              <DialogBody className="text-center">
                Send a message to:
                <br />
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  {phoneNumber}
                </a>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleCloseWhatsappDialog}
                  className="mx-auto"
                >
                  <span>Cancel</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>

          {/* Additional contact text */}
          <p className="text-center text-black font-subheading text-lg ">
            Connect with us on social media or give us a call. We're here to
            help!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
