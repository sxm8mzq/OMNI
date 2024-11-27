Feature: Verify Place Order with AmexCard Pick Up in Store Sec

  Background: User launches url
    #Given the user launches the url
    Given the user launches the SAP url and login to SAP

  @e2e
  Scenario: User should able to verify Place Order with AmexCard Pick Up in Store Sec
    # Then the user enters text "7001" in textbox with placeholder "Postal Code, City, or Store Number"
    # Then the user clicks on the webelement with html tag "title" as "Search"
    # Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
    # Then the user click on "Select"
    # Then the user enters text sku in textbox with placeholder "What can we help you find?"
    # Then the user clicks on the webelement with html tag "class" as "acl-action-button"
    # Then the user waits for webelement "hdca-product" with html attribute "class" to be visible
    # Then the user add product to cart
    # Then the user click on "View Cart"
    # Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
    # Then the user clicks the webelement containing html tag "id" as "fulfillment_BOSS_"
    # Then the user click on "Checkout Now"
    # Then the user click on "Checkout as Guest"
    # Then the user waits for text "Secure Checkout" to be visible
    # Then the user enters text "<firstName>" in the textbox "First Name"
    # Then the user enters text "<lastName>" in the textbox "Last Name"
    # Then the user enters random email in the textbox "Email Address"
    # Then the user enters text "<phonenumber>" in the textbox "Phone"
    # Then the user click on "Someone else will pick up this order"
    # Then the user enters the text "<altFirstName>" in the textbox "First Name" at index "5"
    # Then the user enters the text "<altLastName>" in the textbox "Last Name" at index "5"
    # Then the user enters the text "<email>" in the textbox "Email Address" at index "5"
    # Then the user click on "Continue"
    # Then the user validates if webelement with html attribute "class" as "acl-display--flex" is visible
    # Then the user switches to the frame "__zoid__card_sdk"
    # Then the user enters the "Amex" card details
    # Then the user switches to the parent frame
    # Then the user enters billing details for "Amex" card
    # Then the user click on "Continue"
    # Then the user waits for text "Place Order " to be visible
    # Then the user clicks on text "Place Order" at index "2"
    # Then the user waits for webelement "acl-container acl-container--theme-dark acl-p--small" with html attribute "class" to be visible
    # Then the user validates if " Your order was successful. " text is visible
    # Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"


 #     # # # # # # ----------------- Auth ---------------------
               ##Then the user launches the SAP url and login to SAP
                Then the user check the BDS order details with Tcode /nva03  
               # Then the user check the order and verify the Item Category ZBDS  
                Then the user do the authorization for BOSS order
 
#             # -----------------PO Creation------------------
                Then the user generate IDOC for creating PO
                Then the user process the IDOC number to generate PO with Tcode /nBD87
               Then the user checks the PO with Tcode /nva03
             
# #         # #     # # # # # # ----------------- Delivery Creation---------
                 Then the user go to generate IDOC number /nWE19
                Then the user process the IDOC number to generate OBD /nBD87

# #     # # # # -----------------Picking /Goods Receipt-------------------
                Then the user check the Outbound Delivery /nva03
                Then the user do the MIGO for BDS PO
              
 
# # #      # #     -----------------Release PGI-------------------
                Then the user go to OBD PGI for releasing the delivery /nsa38
                Then the user go to va03 to verify GD goods issue status /nva03
                       
        #  ---------billing block removal------------------
                # Then the user removes Billing Block /nsa38
                Then the user verify billing block removed /nva02
 
        # # #   # ----------------F2 Invoice Steps-------------------
                Then the user process F2 Invoice Updated
                Then the user goto sa37 to verify job invoice job status /nsm37
                Then the user verify that the invoice is created /nva03
              ##  Then the user the process the invoice /nva03
                # Then the user verify journal entry creation /nva03
    Examples:
      | firstName | lastName   | altFirstName | altLastName  | phonenumber | email             |
      | Testuser  | Automation | TestOrange   | WebdriverIO  | 4163458888  | test234@gmail.com |