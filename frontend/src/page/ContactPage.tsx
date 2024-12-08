import Container from "@/components/Container";
import HeroSection from "@/components/HeroSection copy";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  // code from stack over flow
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email.")
    .refine((e) => e === "abcd@fg.com", "This email is not in our database"),
  message: z.string().min(1, "Message is required"),
});

export type ContactFormType = z.infer<typeof formSchema>;

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  // mock the data
  const form = useForm<ContactFormType>({
    resolver: zodResolver(formSchema),
  });
  //
  const onSave = () => {};
  //

  // const openWhatsApp = () => {
  //   const phoneNumber = "+923485831286";
  //   const message = encodeURIComponent(`Hello, `);
  //   window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  // };n

  // const openWhatsApp2 = () => {
  //   const phoneNumber = "+923485831286";
  //   const message = encodeURIComponent(`Hello, `);
  //   window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  // };
  return (
    <>
      {/* banner image */}
      <HeroSection
        image="/imgs/horizontal_03.jpg"
        desc="   Whether you have a question about our services, need assistance, or just want to chat, feel free to reach out! Our team is here to help you with anything you need."
        title="We’d Love to Hear From You"
        buttonText="Get In Touch"
      />
      {/*  */}
      <Container>
        <div className="my-20">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="uppercase font-semibold text-base sm:text-lg md:text-xl reveal">
              Get in touch
            </h4>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl capitalize font-medium italic mt-2 leading-snug md:leading-tight reveal-right">
              WE value the connection with our community and are here to assist
              in any way we can. Feel free to reach us through the following
              channels
            </p>
          </div>
          {/*  */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSave)}
                className="space-y-4 bg-gray-50 rounded-lg md:p-10 p-5 reveal-left"
              >
                <div>
                  <h2 className="text-2xl font-bold"></h2>

                  <FormDescription>Contact us from here</FormDescription>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/*  */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <Button type="submit" className="w-full">
                    Send
                  </Button>
                )}
              </form>
            </Form>
            <div className="reveal-right">
              <div className="flex items-center justify-between ">
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-muted-foreground">(92) 348-5831286</p>
                </div>
                <a
                  href="mailto:crypticpk10@gmail.com"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-muted-foreground">
                      shope_ease@gmail.com
                    </p>
                  </div>
                </a>
              </div>
              {/* whatsapp */}
              {/* <div className="mt-8 text-center flex gap-10 flex-wrap  justify-between">
              <Button
                onClick={openWhatsApp}
                className="bg-green-500 hover:bg-green-600"
              >
                <PhoneCall className="w-5 h-5 mr-2" />
                Whatsapp Contact 1
              </Button>
              <Button
                onClick={openWhatsApp2}
                className="bg-green-500 hover:bg-green-600"
              >
                <PhoneCall className="w-5 h-5 mr-2" />
                Whatsapp Contact 2
              </Button>
            </div> */}
              <Separator className="my-5" />
              <div>
                <h4 className="font-semibold">Address</h4>
                <p className="text-muted-foreground">SIHALA - Islamabad</p>
              </div>
              <Separator className="my-5" />
              <div>
                <h4 className="font-semibold">Follow us</h4>
                <div className="flex items-center gap-2 mt-2">
                  <a href='mailto:crypticpk10@gmail.com"'>
                    <Button variant={"ghost"}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
                        alt=""
                        className="w-6"
                      />
                    </Button>
                  </a>
                  <Link to={""}>
                    <Button variant={"ghost"}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/145/145802.png"
                        alt=""
                        className="w-6"
                      />
                    </Button>
                  </Link>
                  <Link to={""}>
                    <Button variant={"ghost"}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png"
                        alt=""
                        className="w-6"
                      />
                    </Button>
                  </Link>
                  <Link to={""}>
                    <Button variant={"ghost"}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/3670/3670151.png"
                        alt=""
                        className="w-6"
                      />
                    </Button>
                  </Link>
                  <Link to={""}>
                    <Button variant={"ghost"}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/4494/4494497.png"
                        alt=""
                        className="w-6"
                      />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ContactUs;
