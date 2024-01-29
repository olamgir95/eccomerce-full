import { io, Socket } from "socket.io-client";
import { serverApi } from "../lib/config";
import { createContext } from "react";

export const socket: Socket = io(serverApi, { autoConnect: true });
export const SocketContext = createContext<Socket | null>(null);
