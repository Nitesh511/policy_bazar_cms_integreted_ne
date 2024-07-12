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

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Get in Touch with Us
          </h2>

          {/* Facebook link */}
          <div className="flex items-center justify-center mb-4">
            <a
              href="https://www.facebook.com/yourcompany"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              <FaFacebook size={24} className="mr-2" />
              <span className="hidden md:inline">Contact us on Facebook</span>
            </a>
          </div>

          {/* WhatsApp link */}
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={handleOpenWhatsappDialog}
              className="flex items-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              <IoLogoWhatsapp size={24} className="mr-2" />
              <span className="hidden md:inline">Message on WhatsApp</span>
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
                <span className="text-green-600">+977-9841393054</span>
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
          <p className="text-center text-gray-700">
            Connect with us on social media or give us a call. We're here to
            help!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
