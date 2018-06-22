import { Component, OnInit } from '@angular/core';

declare var require: any;
var PeerInfo = require('peer-info');
var Node = require('./browser-bundle');
var Pull = require('pull-stream');
var Pushable = require('pull-pushable');
var pushableObj = Pushable();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataToSend: string;
  peerNodeObjects: any;
  ownNode: any;

  ngOnInit() {
    console.log("Start!")
  }

  SendFunction() {
    console.log(this.dataToSend);
    this.dataToSend = "";
  }

  public createNode() {
    PeerInfo.create((err, peerInfo) => {
      if (err) { return err; }
      let peerIdStr = peerInfo.id.toB58String();
      peerInfo.multiaddrs.add(`/dns4/star-signal.cloud.ipfs.team/tcp/443/wss/p2p-webrtc-star/ipfs/${peerIdStr}`);
      let node = new Node(peerInfo);
      node.idStr = peerIdStr;
      return node;
    });
  }

  public startNode() {
    this.ownNode.start((err) => {
      if (err) {
        return console.log('WebRTC not supported');
      }
      this.ownNode.handle('/chat/1.0.0', (protocol, conn) => {
        Pull(
          pushableObj,
          conn
        )
        Pull(
          conn,
          Pull.map((data) => {
            return data.toString('utf8').replace('\n', '')
          }),
          Pull.drain(console.log)
        )
        
        //still need to handle this.
        //pushableObj.push("Test")
        // process.stdin.setEncoding('utf8')
        // process.openStdin().on('data', (chunk) => {
        //   var data = chunk.toString()
        //   p.push(data)
        // })

      })
    })
  }

  public discoverAndSavePeers() {
    this.ownNode.on('peer:discovery', (peerInfo) => {
      let idStr = peerInfo.id.toB58String();
      this.peerNodeObjects.push(peerInfo);
    })
  }

  public startDialProtocolForAPeer(indexOfPeerObject: number) {
    this.ownNode.dialProtocol(this.peerNodeObjects[indexOfPeerObject], '/chat/1.0.0', (err, conn) => {
      if (conn) {
        Pull(
          pushableObj,
          conn
        )
        // Sink, data converted from buffer to utf8 string
        Pull(
          conn,
          Pull.map((data) => {
            return data.toString('utf8').replace('\n', '')
          }),
          Pull.drain(console.log)
        )
      }
      if (err) {
        console.log("There was a problem while dialing.");
      }
    })
  }

}
