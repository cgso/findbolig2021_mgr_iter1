# findbolig2021_mgr_iter1


> Classes and Objects

**Apartment:**

Apartment objects are instantiated for each scraped apartment on FindBolig, and represent critical details about an apartment, including whether they have had an e-mail notification sent.

Creation Events:
- Created when scraping an apartment based on an AptQuery. 

Loaded Events:
- Loaded from SQL-Alchemy DB for all when comparing newly scraped apartments against existing in Database.
- Loaded with filter (emailaction = False and applied = False) when running through apartments in DB that have not yet had an Action performed.

Business Rules:
- Apartment object should only be listed once in database which should be the record pertaining to the first identification and subsequent actions.

**Apartment Query (AptQuery)**



