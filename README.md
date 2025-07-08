# README

### Dependencies

- Ruby 3.4.4
- Rails 8.0.2

### Main functions

- Real-time chat;
- Devise for auth;
- `turbo-streams` for web-sockets in chat;
- Stimulus controllers for chat and message form;

### TODO
- [ ] Optimise messages initial load;
- [ ] Develop account page;
- [ ] Develop group chats;

### Local run
Clone the repo and run following commands:
```bash
    bundle
    
    rails db:create
    rails db:migrate
    
    bin/dev
```
