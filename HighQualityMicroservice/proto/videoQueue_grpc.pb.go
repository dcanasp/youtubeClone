// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v4.25.1
// source: proto/videoQueue.proto

package videoPackage

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	Video_UpdateVideoStatus_FullMethodName = "/videoPackage.Video/UpdateVideoStatus"
)

// VideoClient is the client API for Video service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type VideoClient interface {
	UpdateVideoStatus(ctx context.Context, in *Uuid, opts ...grpc.CallOption) (*Success, error)
}

type videoClient struct {
	cc grpc.ClientConnInterface
}

func NewVideoClient(cc grpc.ClientConnInterface) VideoClient {
	return &videoClient{cc}
}

func (c *videoClient) UpdateVideoStatus(ctx context.Context, in *Uuid, opts ...grpc.CallOption) (*Success, error) {
	out := new(Success)
	err := c.cc.Invoke(ctx, Video_UpdateVideoStatus_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// VideoServer is the server API for Video service.
// All implementations must embed UnimplementedVideoServer
// for forward compatibility
type VideoServer interface {
	UpdateVideoStatus(context.Context, *Uuid) (*Success, error)
	mustEmbedUnimplementedVideoServer()
}

// UnimplementedVideoServer must be embedded to have forward compatible implementations.
type UnimplementedVideoServer struct {
}

func (UnimplementedVideoServer) UpdateVideoStatus(context.Context, *Uuid) (*Success, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateVideoStatus not implemented")
}
func (UnimplementedVideoServer) mustEmbedUnimplementedVideoServer() {}

// UnsafeVideoServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to VideoServer will
// result in compilation errors.
type UnsafeVideoServer interface {
	mustEmbedUnimplementedVideoServer()
}

func RegisterVideoServer(s grpc.ServiceRegistrar, srv VideoServer) {
	s.RegisterService(&Video_ServiceDesc, srv)
}

func _Video_UpdateVideoStatus_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Uuid)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(VideoServer).UpdateVideoStatus(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Video_UpdateVideoStatus_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(VideoServer).UpdateVideoStatus(ctx, req.(*Uuid))
	}
	return interceptor(ctx, in, info, handler)
}

// Video_ServiceDesc is the grpc.ServiceDesc for Video service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Video_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "videoPackage.Video",
	HandlerType: (*VideoServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "UpdateVideoStatus",
			Handler:    _Video_UpdateVideoStatus_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "proto/videoQueue.proto",
}