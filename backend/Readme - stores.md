Here are the steps to create an index pattern in Kibana for your logs:

1. Open Kibana in your browser:

```
http://localhost:5601
```

2. Go to Visualize on the left menu:

   - Click on "Index Patterns" under Kibana
   - Click the "Create index pattern" button
   - In the "Index pattern" field, enter `logstash-*`
     (This will match all indices that Logstash creates)
   - Click "Next step"
   - In the Time field dropdown, select "@timestamp"
   - Click "Create index pattern"

3. View Your Logs:

   - Click on "Discover" (left menu)
   - In the top-left dropdown, select your new "logstash-\*" index pattern
   - You should now see your logs from both services

4. Optional - Add Useful Fields:
   - In the Discover view, look at the "Available fields" list on the left
   - Click "+" next to useful fields like:
     - tag (to see which service the log is from)
     - message (the actual log content)
     - container_name
     - host

Now you can:

- Search your logs using the search bar
- Filter by service using tag:"service1" or tag:"service2"
- See the timestamp and message content
- Use the time picker in the top-right to adjust the time range
