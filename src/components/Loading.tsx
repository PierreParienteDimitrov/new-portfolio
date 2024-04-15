import { Container } from '@/components/Container'
import Lottie from "lottie-react";
import Animation from "@/images/Lottie/Animation.json";


export function Loading() {
  return (
    <Container className="flex justify-center items-center w-full h-full">
      <Lottie animationData={Animation} loop={true} />
    </Container>
  )
}





