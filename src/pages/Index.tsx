import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Video, Users, Calendar } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [meetingId, setMeetingId] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();

  const generateMeetingId = () => {
    return uuidv4().substring(0, 8);
  };

  const createNewMeeting = () => {
    const newMeetingId = generateMeetingId();
    setMeetingId(newMeetingId);
    toast({
      title: "Meeting created!",
      description: `Your meeting ID is: ${newMeetingId}`,
    });
  };

  const joinMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a meeting ID",
        variant: "destructive",
      });
      return;
    }
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-meeting-primary to-meeting-accent mb-4">
              Virtual Meeting Haven
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with anyone, anywhere with our secure, high-quality video conferencing platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-meeting-primary" />
                  <span>New Meeting</span>
                </CardTitle>
                <CardDescription>Start a new meeting and invite others</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                    <Input 
                      id="name"
                      type="text" 
                      placeholder="Enter your name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={createNewMeeting}>
                  Generate ID
                </Button>
                {name && meetingId ? (
                  <Link to={`/meeting/${meetingId}?name=${encodeURIComponent(name)}`}>
                    <Button>
                      Start Meeting
                    </Button>
                  </Link>
                ) : (
                  <Button disabled={!name}>Start Meeting</Button>
                )}
              </CardFooter>
            </Card>

            <Card className="shadow-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-meeting-accent" />
                  <span>Join Meeting</span>
                </CardTitle>
                <CardDescription>Join an existing meeting with ID</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={joinMeeting} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="join-name" className="text-sm font-medium">Your Name</label>
                    <Input 
                      id="join-name"
                      type="text" 
                      placeholder="Enter your name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="meeting-id" className="text-sm font-medium">Meeting ID</label>
                    <Input 
                      id="meeting-id"
                      type="text" 
                      placeholder="Enter meeting ID" 
                      value={meetingId}
                      onChange={(e) => setMeetingId(e.target.value)}
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                {name && meetingId ? (
                  <Link to={`/meeting/${meetingId}?name=${encodeURIComponent(name)}`} className="w-full">
                    <Button className="w-full">Join Meeting</Button>
                  </Link>
                ) : (
                  <Button className="w-full" disabled={!name || !meetingId}>Join Meeting</Button>
                )}
              </CardFooter>
            </Card>
          </div>

          <div className="text-center mb-8">
            <Link to="/schedule">
              <Button variant="outline" className="w-full md:w-auto">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </Link>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-meeting-primary">HD Video</h3>
                <p className="text-sm text-gray-600">Crystal clear video quality</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-meeting-primary">Screen Sharing</h3>
                <p className="text-sm text-gray-600">Share your screen instantly</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-meeting-primary">Audio Controls</h3>
                <p className="text-sm text-gray-600">Easily mute and unmute</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-meeting-primary">Secure Meetings</h3>
                <p className="text-sm text-gray-600">End-to-end encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
