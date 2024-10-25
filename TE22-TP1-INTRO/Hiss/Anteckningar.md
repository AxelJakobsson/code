Alla våningar (förutom första) har två knappar, Vill Upp eller Vill Ner.

Ifall hissen går förbi en våning som vill till samma riktning (knappen) så stannar den och plockar upp den personen och sen fortsätter i samma riktning som tidigare. 

När hissen har stannat och ingen person inne i hissen har tryckt på någon våning så går den till den närmaste våning där någon har tryckt. 



Ha ett value som hissen vill till och en riktning.
Ifall det finns någon våning innan valuet som hissen vill till så kollar den ifall det är i samma riktning, ifall det är det så plockar den upp det och byter valuet som hissen vill till till det nya och fortsätter samma sak som tidigare annars stannar den vid det nya våningsvaluet och kollar ifall det är någon annan i hissen som vill till någon annan våning. 


När man är i hissen och trycker på en våning så får hissen en ny targetFloor. Ifall targetFloor > currentFloor så blir direction == UP annars direction == DOWN. Ifall man åker förbi en våning mellan currentFloor och targetFloor och som ska i samma direction så lägger man till dem i en array. Arrayen sparar vilka våningar som hissen ska stanna vid. 