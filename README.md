# rng_transitions_manager
Rng-based decision maker for writing, and other uses.

Play:\
https://keikay10.github.io/rng_transitions_manager

Instructions:\
Each transition rows are arrange as such;\
Checkbox, rectangular handle, range, text, percentage meter

Checkboxm for multiple deletes\
Rectangular handle, drag and drop to rearrange, double click to add new\
Range, defines chance, each range is divided by total sum of ranges to get probability\
Text, add whatever\
Percentage meter, displays visual representation of probability

Transitions can be saved and loaded as concatenated transitions\
Copy all copies concatenated transitions and outcomes

Build:\
Use Bun to bundle index.ts, or use your preferred bundler\
Run index.html in ./http
