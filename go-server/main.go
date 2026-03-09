package main

import (
	"context"
	"log"
	"net"

	pb "go-server/pb" // import package ที่เรา generate มา
	"google.golang.org/grpc"
)

// 1. สร้าง Struct เพื่อ Implement Interface ของ gRPC
type server struct {
	pb.UnimplementedBalanceServiceServer
}

// 2. เขียน Logic ของฟังก์ชัน GetBalance (ต้องชื่อเดียวกับใน .proto)
func (s *server) GetBalance(ctx context.Context, req *pb.BalanceRequest) (*pb.BalanceResponse, error) {
	log.Printf("Received: UserID %v", req.GetUserId())
	
	// จำลอง Logic: ถ้า ID เป็น chain ให้มีเงินเยอะหน่อย
	amount := 100.0
	if req.GetUserId() == "chain" {
		amount = 9999.99
	}

	return &pb.BalanceResponse{
		Amount:   amount,
		Currency: "THB",
	}, nil
}

func main() {
	// 3. ตั้งค่าการเชื่อมต่อ (Listening)
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterBalanceServiceServer(s, &server{})

	log.Println("Go gRPC Server is running on port 50051...")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}